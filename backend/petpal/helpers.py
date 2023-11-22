from typing import Any, Callable, Literal
from functools import wraps
from django.forms import ValidationError

from django.http import JsonResponse
from django.core.validators import validate_email


email = type('email', (), {})
"""An email"""


# def required_fields(fields: dict[str, type], method_type: Literal['body', 'query_params'] = 'body', partial_override: bool = True):
def required_fields(fields, method_type = 'body', partial_override = True):
    """Decorator that ensures the provided fields are present in the request body or query params"""
    for t in fields.values():
        if t not in {int, str, float, bool, email}:
            raise TypeError('The only supported field types for validation are int, str, float, bool, email')
    def inner_decorator(f: Callable):
        @wraps(f)
        def wrapper(self, request, *args, **kwargs):
            # ensure body or query params contains args
            problematic_fields = []
            for field_name in fields:
                field_info = {}
                field_bad = False

                if kwargs.get('partial', False) and partial_override \
                    and ((method_type == 'body' and field_name not in request.data) \
                    or (method_type == 'query_params' and field_name not in request.query_params)):
                    continue # skip fields that aren't present
                
                if not (kwargs.get('partial', False) and partial_override) \
                    and ((method_type == 'body' and field_name not in request.data) \
                    or (method_type == 'query_params' and field_name not in request.query_params)):
                    field_bad = True
                    field_info['field'] = field_name
                    field_info['missing'] = True
                else:
                    field_value = request.data[field_name] if method_type == 'body' else request.query_params[field_name]
                    field_type = type(field_value)
                    expected_type = fields[field_name]
                    if expected_type == email:
                        # email validation
                        if not _validate_email(field_value):
                            field_bad = True
                            field_info['field'] = field_name
                            field_info['expected_type'] = '<class \'str\'> formatted as email'
                            field_info['actual_type'] = str(field_type)
                            field_info['field_value'] = field_value
                    elif expected_type != field_type:
                        field_bad = True
                        field_info['field'] = field_name
                        field_info['expected_type'] = str(expected_type)
                        field_info['actual_type'] = str(field_type)
                        field_info['field_value'] = field_value
                
                if field_bad:
                    problematic_fields.append(field_info)
            
            if len(problematic_fields) > 0:
                return JsonResponse(dict(message='Field validation error',
                                         problematic_fields=problematic_fields), status=400)
            return f(self, request, *args, **kwargs)
        return wrapper
    return inner_decorator


# def optional_fields(fields: dict[str, type], method_type: Literal['body', 'query_params'] = 'body'):
def optional_fields(fields, method_type = 'body'):
    """Decorator that ensures the provided fields are of the correct type if present"""
    for t in fields.values():
        if t not in {int, str, float, bool, email}:
            raise TypeError('The only supported field types for validation are int, str, float, bool, email')
    def inner_decorator(f: Callable):
        @wraps(f)
        def wrapper(self, request, *args, **kwargs):
            # ensure body or query params contains args
            problematic_fields = []
            for field_name in fields:
                field_info = {}
                field_bad = False
                
                if (method_type == 'body' and field_name not in request.data) \
                    or (method_type == 'query_params' and field_name not in request.query_params):
                    continue # skip fields that aren't present

                field_value = request.data[field_name] if method_type == 'body' else request.query_params[field_name]
                field_type = type(field_value)
                expected_type = fields[field_name]
                if expected_type == email:
                    # email validation
                    if not _validate_email(field_value):
                        field_bad = True
                        field_info['field'] = field_name
                        field_info['expected_type'] = '<class \'str\'> formatted as email'
                        field_info['actual_type'] = str(field_type)
                        field_info['field_value'] = field_value
                elif expected_type != field_type:
                    field_bad = True
                    field_info['field'] = field_name
                    field_info['expected_type'] = str(expected_type)
                    field_info['actual_type'] = str(field_type)
                    field_info['field_value'] = field_value
                
                if field_bad:
                    problematic_fields.append(field_info)
            
            if len(problematic_fields) > 0:
                return JsonResponse(dict(message='Field validation error',
                                         problematic_fields=problematic_fields), status=400)
            return f(self, request, *args, **kwargs)
        return wrapper
    return inner_decorator


# def _validate_email(email: Any) -> bool:
def _validate_email(email):
    """Determines whether the provided input is an email"""
    if type(email) != str:
        return False
    try:
        validate_email(email)
    except ValidationError:
        return False
    return True

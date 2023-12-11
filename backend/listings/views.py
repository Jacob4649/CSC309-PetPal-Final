from tempfile import NamedTemporaryFile
from django.forms import ImageField
from django.http import HttpResponse, JsonResponse
from rest_framework.viewsets import ModelViewSet, ViewSet
from .pagination import SmallNonCustomizablePaginationBatch
from listings.serializers import ListingSerializer
from listings.models import Listing
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class ListingPicView(APIView):
    
    authentication_classes = (JWTAuthentication,)
    permission_classes = []

    def get(self, request, *args, **kwargs):
        listing_id = kwargs.get('id', None)

        if listing_id is None:
            return HttpResponse(status=404)
        
        listing = None
        try:
            listing = Listing.objects.get(pk=listing_id)
        except Listing.DoesNotExist:
            return JsonResponse(dict(message='Listing not found'), status=404)
        
        if listing.listing_pic.name == '':
            return JsonResponse(dict(message='Listing has no profile pic'), status=404)

        content_type = 'image/png' if listing.listing_pic.name.lower().endswith('png') else 'image/jpeg'

        # create response and set content type
        response = HttpResponse(listing.listing_pic, content_type=content_type)
        
        # set file as attachment and specify name
        response['Content-Disposition'] = f'attachment; filename="{listing.listing_pic.name}"'
        
        return response
    
    def put(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return JsonResponse(dict(message="User is not authenticated"), status=401)

        listing_id = kwargs.get('id', None)

        if listing_id is None:
            return JsonResponse(dict(message="Listing does not exist"), status=404)
        
        listing = None
        try:
            listing = Listing.objects.get(pk=listing_id)
        except Listing.DoesNotExist:
            return JsonResponse(dict(message='Listing not found'), status=404)
        
        if listing.shelter.id != request.user.id:
            return JsonResponse(dict(message='Can only set own listing profile picture'), status=403)

        content_type = request.content_type

        if not content_type.endswith('png') and not content_type.endswith('jpeg'):
            return JsonResponse(dict(message='Can only upload png or jpeg as profile pic'), status=400)
        
        extension = 'png' if content_type.endswith('png') else 'jpg'

        with NamedTemporaryFile("wb+") as f:
            f.write(bytes(request.body))
            f.seek(0)
            listing.listing_pic = ImageField(f, f'{listing.id}.{extension}')
            listing.save()

        return JsonResponse(ListingSerializer(listing).data, status=200)


class ListingViewSet(ModelViewSet):
    """View set for listings"""
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class=ListingSerializer
    pagination_class = SmallNonCustomizablePaginationBatch


    def get_queryset(self):
        listings = Listing.objects.all()

        # filtering options
        shelter_id = self.request.query_params.get('shelter_id', None)
        if self.request.user.is_shelter:
            shelter_id = self.request.user.pk
        if shelter_id is not None: 
            listings =  listings.filter(shelter_id=shelter_id)

        listing_status = self.request.query_params.get('listing_status', 3)
        if listing_status is not None:
            listings = listings.filter(listing_status=listing_status)

        breed = self.request.query_params.get("breed", None)
        if breed is not None:
            listings = listings.filter(breed=breed)

        species = self.request.query_params.get("species", None)
        if species is not None:
            listings = listings.filter(species=species)

        age_months = self.request.query_params.get("age_months", None)
        if age_months is not None:
            listings = listings.filter(age_months=age_months)

        q = self.request.query_params.get("q", None)
        if q is not None:
            listings = listings.filter(name__contains=q)

        #ordering
        sort_order = self.request.query_params.get("sort_order", None)
        sort_reversed = self.request.query_params.get("sort_reversed", "false")
        if sort_reversed not in ["true", "false"]:
            sort_reversed = "false"
        if sort_order is not None and sort_order in ["name", "age_months", "height_feet", "weight_lbs"]:
            listings = listings.order_by(sort_order) if sort_reversed == "false" else listings.order_by("-" + sort_order)
        if sort_order is None:
            listings = listings.order_by('name')
        return listings

    def list(self, request, *args, **kwargs):
        if request.user.is_shelter:
            shelter_id = request.query_params.get("shelter_id", None)
            if shelter_id is not None and request.user.pk != shelter_id:
                return JsonResponse(dict(message="A shelter can only view its own listings"), status = 403)
        return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):

        object = self.get_object()
        if object.shelter != request.user:
            return JsonResponse(dict(message="Only the owner of a listing can modify it"), status = 403)
        
        request.data['shelter'] = request.user.pk

        return super().update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):

        if request.user.is_shelter:
            request.data['shelter'] = request.user.pk
        else:
            return JsonResponse(dict(message="Only shelters can create listings"), status = 403)

        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        object = self.get_object()
        if object.shelter != request.user:
            return JsonResponse(dict(message="Only the owner of a listing can modify it"), status = 403)
        
        request.data['shelter'] = request.user.pk
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):

        object = self.get_object()
        if object.shelter != request.user:
            return JsonResponse(dict(message="Only the owner of a listing can delete it"), status = 403)

        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

from rest_framework.pagination import PageNumberPagination

class SmallNonCustomizablePaginationBatch(PageNumberPagination):
    page_size = 3
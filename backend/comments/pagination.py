from rest_framework.pagination import PageNumberPagination, CursorPagination

class SmallNonCustomizablePaginationBatch(PageNumberPagination):
    page_size = 6


class SmallTimestampPagination(CursorPagination):
    page_size=7
    ordering="-time_sent"
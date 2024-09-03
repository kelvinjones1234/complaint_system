from django.contrib import admin
from .models import Complaint, ComplaintCategory, Feedback
from django.utils.html import format_html  # Import this to use format_html

# Inline class to manage feedback directly from the Complaint admin view
class FeedbackInline(admin.TabularInline):
    model = Feedback
    extra = 1  # Number of empty feedback forms to display
    readonly_fields = ('created_at',)
    fields = ('message', 'status', 'created_at',)
    can_delete = False
    verbose_name = "Feedback"
    verbose_name_plural = "Feedback"

# Custom admin class for Complaint model
@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_by', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'created_by__username')
    readonly_fields = ('created_by', )
    inlines = [FeedbackInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'category',)
        }),
        ('User Information', {
            'fields': ('created_by',),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)

# Custom admin class for ComplaintCategory model
@admin.register(ComplaintCategory)
class ComplaintCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

# Custom admin class for Feedback model (Optional, for standalone management)
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('complaint',  'created_at',)
    search_fields = ('complaint__title', 'message',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    # Linking Feedback back to the Complaint's admin view
    def complaint_link(self, obj):
        url = f'/admin/complaints/complaint/{obj.complaint.id}/change/'
        return format_html(f'<a href="{url}">{obj.complaint.title}</a>')

    complaint_link.short_description = 'Complaint'



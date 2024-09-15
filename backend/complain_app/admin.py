from django.utils.html import format_html
from django.contrib import admin
from .models import Complaint, ComplaintCategory, Feedback


class FeedbackInline(admin.TabularInline):
    model = Feedback
    extra = 1
    readonly_fields = ('created_at',)
    fields = ('message', 'status', 'created_at',)
    can_delete = False
    verbose_name = "Feedback"
    verbose_name_plural = "Feedback"

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
       list_display = ('title', 'category', 'created_by', 'created_at', 'file_link')
       list_filter = ('category', 'created_at')
       search_fields = ('title', 'description', 'created_by__username')
       readonly_fields = ('created_by', 'file_link')
       inlines = [FeedbackInline]
       fieldsets = (
           (None, {
               'fields': ('title', 'description', 'category', 'file', 'file_link')
           }),
           ('User Information', {
               'fields': ('created_by',),
               'classes': ('collapse',)
           }),
       )
       ordering = ('-created_at',)

       def file_link(self, obj):
           if obj.file:
               return format_html(
                   '<a href="{}" style="color: white; background-color: blue; padding: 5px 20px; text-decoration: none; border-radius: 5px;" target="_blank">Download</a>',
                   obj.file.url
               )
           return "No file"

       file_link.short_description = 'File'
       file_link.allow_tags = True

# Register ComplaintCategory and Feedback admin classes
@admin.register(ComplaintCategory)
class ComplaintCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('complaint', 'created_at',)
    search_fields = ('complaint__title', 'message',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def complaint_link(self, obj):
        url = f'/admin/complaints/complaint/{obj.complaint.id}/change/'
        return format_html(f'<a href="{url}">{obj.complaint.title}</a>')

    complaint_link.short_description = 'Complaint'

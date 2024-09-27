from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Feedback
from django.template.loader import render_to_string
from django.utils.html import strip_tags


@receiver(post_save, sender=Feedback)
def send_feedback_email(sender, instance, created, **kwargs):
    if created:
        complaint = instance.complaint
        user_email = complaint.created_by.email
        subject = f"Feedback on your complaint: {complaint.title}"

        # HTML message template
        message_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }}
                .container {{
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 20px auto;
                }}
                .header {{
                    background-color: #0044cc;
                    padding: 10px;
                    color: #fff;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    padding: 20px;
                }}
                .footer {{
                    margin-top: 30px;
                    font-size: 12px;
                    text-align: center;
                    color: #777;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Feedback on Your Complaint</h1>
                </div>
                <div class="content">
                    <p>Dear {complaint.created_by},</p>
                    <p>Your complaint titled '<strong>{complaint.title}</strong>' has been updated with the following feedback:</p>
                    <p><strong>Status:</strong> {instance.get_status_display()}</p>
                    <p><strong>Message:</strong> {instance.message if instance.message else 'No additional message.'}</p>
                    <p>Thank you for your patience.</p>
                </div>
                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>ACTU FPB Support Team</strong></p>
                </div>
            </div>
        </body>
        </html>
        """

        # Plain text version
        plain_message = strip_tags(message_html)

        # Mask the sender email with a custom name
        from_email = f'ACTU FPB Support Team <{settings.DEFAULT_FROM_EMAIL}>'

        # Send email
        send_mail(
            subject,
            plain_message,  # Plain text content for email clients that don't support HTML
            from_email,
            [user_email],
            fail_silently=False,
            html_message=message_html,  # HTML content
        )
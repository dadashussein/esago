import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from config.config import configs


class EmailService:
    @staticmethod
    def send_email(to_address, subject, body, is_html=True, attachments=None):
        try:
            msg = MIMEMultipart()
            msg['From'] = configs.EMAIL_FROM
            msg['To'] = to_address
            msg['Subject'] = subject

            if is_html:
                msg.attach(MIMEText(body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))

            if attachments:
                for filename, filecontent in attachments.items():
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(filecontent)
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', f'attachment; filename={filename}')
                    msg.attach(part)

            with smtplib.SMTP(configs.EMAIL_HOST, configs.EMAIL_PORT) as server:
                if configs.EMAIL_TLS:
                    server.starttls()
                server.login(configs.EMAIL_USERNAME, configs.EMAIL_PASSWORD)
                server.sendmail(configs.EMAIL_FROM, to_address, msg.as_string())
        except Exception as e:
            print(f"Failed to send email: {e}")

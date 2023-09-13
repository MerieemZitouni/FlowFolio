# Generated by Django 4.2.4 on 2023-09-12 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='revision',
            name='doc',
        ),
        migrations.AddField(
            model_name='appuser',
            name='disipline',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='appuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='appuser',
            name='role',
            field=models.CharField(choices=[('doccontrol', 'Doc Control'), ('simpleuser', 'Simple User')], default='simpleuser', max_length=20),
        ),
        migrations.DeleteModel(
            name='Document',
        ),
        migrations.DeleteModel(
            name='Revision',
        ),
    ]

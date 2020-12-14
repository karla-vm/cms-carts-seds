# Generated by Django 2.2.13 on 2020-10-08 09:01

from django.db import migrations, models  # type: ignore
import django.db.models.deletion  # type: ignore


class Migration(migrations.Migration):

    dependencies = [
        ("carts_api", "0009_statefromusername"),
    ]

    operations = [
        migrations.CreateModel(
            name="StateStatus",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("year", models.IntegerField(null=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("not_started", "Not started"),
                            ("started", "Started"),
                            ("certified", "Certified"),
                            ("uncertified", "Uncertified"),
                            ("accepted", "Accepted"),
                            ("submitted", "Submitted"),
                            ("published", "Published"),
                        ],
                        default="not_started",
                        max_length=32,
                    ),
                ),
                ("last_changed", models.DateTimeField(null=True)),
                (
                    "state",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="carts_api.State",
                    ),
                ),
            ],
        ),
    ]

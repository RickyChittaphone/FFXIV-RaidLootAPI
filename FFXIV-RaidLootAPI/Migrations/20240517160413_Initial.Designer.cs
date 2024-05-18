﻿// <auto-generated />
using System;
using FFXIV_RaidLootAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FFXIV_RaidLootAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240517160413_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Gear", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GearLevel")
                        .HasColumnType("int");

                    b.Property<int>("GearType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PlayersId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlayersId");

                    b.ToTable("Gears");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Players", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Locked")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int?>("StaticId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StaticId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Raid", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Raids");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Static", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Statics");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Gear", b =>
                {
                    b.HasOne("FFXIV_RaidLootAPI.Models.Players", null)
                        .WithMany("Gears")
                        .HasForeignKey("PlayersId");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Players", b =>
                {
                    b.HasOne("FFXIV_RaidLootAPI.Models.Static", null)
                        .WithMany("Players")
                        .HasForeignKey("StaticId");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Players", b =>
                {
                    b.Navigation("Gears");
                });

            modelBuilder.Entity("FFXIV_RaidLootAPI.Models.Static", b =>
                {
                    b.Navigation("Players");
                });
#pragma warning restore 612, 618
        }
    }
}

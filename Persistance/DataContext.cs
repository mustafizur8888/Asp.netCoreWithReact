﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 101" },
                new Value { Id = 2, Name = "Value 102" },
                new Value { Id = 3, Name = "Value 103" },
                new Value { Id = 4, Name = "Value 104" },
                new Value { Id = 5, Name = "Value 105" }
            );
            modelBuilder.Entity<UserActivity>(x => x.HasKey(ua => new
            {
                ua.AppUserId,
                ua.ActivityId
            }));

            modelBuilder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.UserActivities)
            .HasForeignKey(u => u.AppUserId);

            modelBuilder.Entity<UserActivity>()
            .HasOne(a => a.Activity)
            .WithMany(u => u.UserActivities)
            .HasForeignKey(a => a.ActivityId);

            modelBuilder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new
                {
                    k.ObserverId,
                    k.TargetId
                });

                b.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.Restrict);
            });

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> Followings { get; set; }
        //   public DbSet<AppUser> AppUsers { get; set; }
    }
}

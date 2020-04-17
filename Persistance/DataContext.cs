using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 101" },
                new Value { Id = 2, Name = "Value 102" },
                new Value { Id = 3, Name = "Value 103" },
                new Value { Id = 4, Name = "Value 104" },
                new Value { Id = 5, Name = "Value 105" }
            );
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
    }
}

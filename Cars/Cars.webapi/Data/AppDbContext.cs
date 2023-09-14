using Cars.webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace Cars.webapi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<CarModel> CarModels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("DataSource=DbCars.db;Cache=Shared");
        }
    }
}

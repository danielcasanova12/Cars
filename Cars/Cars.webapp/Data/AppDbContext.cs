using Cars.webapp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Cars.webapp.Data
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

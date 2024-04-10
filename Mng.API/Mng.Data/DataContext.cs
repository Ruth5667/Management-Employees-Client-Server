using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data
{
    public class DataContext:DbContext
    {
        IConfiguration _configuration;
        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration):base(options)
        {
            _configuration = configuration;

        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RoleToEmployee> RoleToEmployee { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            }
        }
    }
}

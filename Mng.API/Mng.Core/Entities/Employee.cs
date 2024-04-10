using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public enum Gender
    {
        Male,
        Female
    }
    public class Employee
    {
        public int Id { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public bool Status { get; set; }
        public List<RoleToEmployee> Roles { get; set;}
    }
}

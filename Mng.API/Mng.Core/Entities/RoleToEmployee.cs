using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public class RoleToEmployee
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        //public int EmployeeId { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public bool Management { get; set; }
        //public Employee Employee { get; set; }
        public Role Role { get;  }
    }
}

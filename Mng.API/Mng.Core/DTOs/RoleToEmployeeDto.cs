using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.DTOs
{
    public class RoleToEmployeeDto
    {
        public int RoleId { get; set; }
        //public int EmployeeId { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public bool Management { get; set; }


        //public EmployeeDto Employee { get; set; }
        public RoleDto Role { get; set; }
    }
}

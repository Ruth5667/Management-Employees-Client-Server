using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        //public bool Status { get; set; }
        public List<RoleToEmployeeDto> Roles { get; set; }
    }
}

using Mng.Core.DTOs;
using Mng.Core.Entities;

namespace Mng.API.Models
{
    public class EmployeePostModel
    {
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public bool? Status { get; set; }
        public List<RoleToEmployeePostModel> Roles { get; set; }

    }
}

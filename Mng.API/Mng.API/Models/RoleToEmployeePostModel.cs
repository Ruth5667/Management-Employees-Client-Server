using Mng.Core.Entities;

namespace Mng.API.Models
{
    public class RoleToEmployeePostModel
    {
        public RolePostModel Role { get; set; }
        //public int EmployeeId { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public bool Management { get; set; }

    }
}

using AutoMapper;
using Mng.API.Models;
using Mng.Core.DTOs;
using Mng.Core.Entities;

namespace Mng.API.Mapping
{
    public class PostModelsMappingProfile:Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<RoleToEmployeePostModel, RoleToEmployee>();
        }
    }
}

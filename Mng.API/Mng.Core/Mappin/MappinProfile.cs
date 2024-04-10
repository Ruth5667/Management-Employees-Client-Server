using AutoMapper;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Mappin
{
    public class MappinProfile:Profile
    {
        public MappinProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<RoleToEmployee, RoleToEmployeeDto>().ReverseMap();
            //CreateMap<Customer, CustomerDto>().ReverseMap();
            //CreateMap<OrderProduct, OrderProductDto>().ReverseMap();
        }
    }
}

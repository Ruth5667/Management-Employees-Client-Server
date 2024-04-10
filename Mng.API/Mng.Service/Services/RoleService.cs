using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repository;
        public RoleService(IRoleRepository repository)
        {
            _repository = repository;

        }
        public IEnumerable<Role> GetRoles()
        {
            return _repository.GetRoles();
        }
        public Role GetRoleById(int id)
        {
            return _repository.GetRoleById(id);
        }
        public void Delete(int id)
        {
             _repository.Delete(id);
        }
        public Role Post(Role role)
        {
            return _repository.Post(role);
        }

        public Role Put(int id, Role role)
        {
            return _repository.Put(id,role);
        }
    }
}

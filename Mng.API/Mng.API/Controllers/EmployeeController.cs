using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.API.Models;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var employeesList = _employeeService.Get();
                var employeesListDto = _mapper.Map<IEnumerable<EmployeeDto>>(employeesList);
                return Ok(employeesListDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            try
            {
                var employee = _employeeService.GetById(id);
                var employeeDto = _mapper.Map<EmployeeDto>(employee);
                return Ok(employeeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public ActionResult Post([FromBody] EmployeePostModel employee)
        {
            try
            {
                var employeeToAdd = _employeeService.Post(_mapper.Map<Employee>(employee));
                return Ok(employeeToAdd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] EmployeePostModel employee)
        {
            try
            {
                var updateEmployee =  _employeeService.Put(id, _mapper.Map<Employee>(employee));
                return Ok(updateEmployee);
            }
            catch (Exception ex)
            {

               return BadRequest(ex.Message);
            }
        }
        //[Route("")]
        [HttpPut("UpdateStatus/{id}")]
        public ActionResult UpdateStatus(int id)
        {
            try
            {
               
                return Ok(_employeeService.UpdateStatus(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // DELETE api/<EmployeeController>/5
        //[HttpDelete("{id}")]
        //public ActionResult Delete(int id,Employee employee)
        //{
        //    var CurrentEmployee = _employeeService.GetById(id);
        //    if (CurrentEmployee is null)
        //    {
        //        return NotFound();
        //    }
        //    _employeeService.UpdateStatus(id,employee);
        //    return  

        //}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _employeeService.GetById(id);
            if (user is null)
            {
                return NotFound();
            }
            _employeeService.Delete(id);
            return NoContent();

        }
    }
}

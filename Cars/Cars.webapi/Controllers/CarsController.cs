using Cars.webapi.Data;
using Cars.webapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CarsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarModel>>> GetCars()
        {
            try
            {
                var cars = await _context.CarModels.ToListAsync();
                return Ok(cars);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CarModel>> GetCar(int id)
        {
            try
            {
                var car = await _context.CarModels.FindAsync(id);

                if (car == null)
                {
                    return NotFound($"Carro com ID {id} não encontrado.");
                }

                return Ok(car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<ActionResult<CarModel>> CreateCar([FromBody] CarModel car)
        {
            try
            {
                if (car == null)
                {
                    return BadRequest("Dados inválidos para criar um carro.");
                }

                _context.CarModels.Add(car);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCars), new { id = car.CarId }, car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(int id, [FromBody] CarModel updatedCar)
        {
            try
            {
                var existingCar = await _context.CarModels.FindAsync(id);

                if (existingCar == null)
                {
                    return NotFound($"Carro com ID {id} não encontrado.");
                }

                if (updatedCar == null)
                {
                    return BadRequest("Dados inválidos para atualizar o carro.");
                }

                existingCar.Model = updatedCar.Model;
                existingCar.Color = updatedCar.Color;
                existingCar.Year = updatedCar.Year;
                existingCar.PhotoUrl = updatedCar.PhotoUrl;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            try
            {
                var car = await _context.CarModels.FindAsync(id);

                if (car == null)
                {
                    return NotFound($"Carro com ID {id} não encontrado.");
                }

                _context.CarModels.Remove(car);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

    }
}

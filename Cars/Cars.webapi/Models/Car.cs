using System.ComponentModel.DataAnnotations;

namespace Cars.webapi.Models
{
    public class CarModel
    {
        [Key]
        public int CarId { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int Year { get; set; }
        public string PhotoUrl { get; set; }

    }
}

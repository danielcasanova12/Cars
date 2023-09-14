using Cars.webapi.Data;
using Microsoft.AspNetCore.Builder;

namespace Cars.webapi
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void configureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors(options =>
            {
                var frontendUrl = Configuration.GetValue<string>("UrlFrontend");
                options.AddDefaultPolicy(builder =>
                {
                    builder
                    .WithOrigins(frontendUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<AppDbContext>();
        }

        public void configureAplication(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

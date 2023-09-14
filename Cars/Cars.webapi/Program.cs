using Cars.webapi;
var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);
startup.configureServices(builder.Services);


var app = builder.Build();


startup.configureAplication(app, app.Environment);
app.Run();

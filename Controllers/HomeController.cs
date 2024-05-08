using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;
using Web.Models;

namespace Web.Controllers;

public class HomeController : Controller
{
    private readonly List<Dictionary<string, string>> educations = new List<Dictionary<string, string>>
    {
        new Dictionary<string, string>{
            {"HTML/CSS/JS","99%"},
            {"Vue Js","85%"},
            {"React Js","60%"},
            {"Bootstrap","99%"},
            {"Jquery","99%"},
            {"Flutter","75%"},
            {"Java Android","85%"},
        },
        new Dictionary<string, string>{
            {"Python","95%"},
            {"Django","85%"},
            {"Flask","90%"},
            {"C Sharp","95%"},
            {"DotNetCore","85%"},
            {"Node JS","75%"},
            {"Type Script","80%"},
        },
        new Dictionary<string, string>{
            {"Real-Time Application","90%"},
            {"Telegram Bot","99%"},
            {"BlockChain","60%"},
            {"NoSql - BigData","75%"},
            {"Machine Learning","55%"},
            {"Trading Bot","85%"},
            {"Micro Services","80%"},
        },
};

    private readonly IConfiguration _configuration;
    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IActionResult Index()
    {
        return View(educations);
    }
    [HttpPost]
    public async Task<IActionResult> Index([FromBody] ContactModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        string TOKEN = _configuration.GetSection("Telegram")["Token"];
        string OWNER_ID = _configuration.GetSection("Telegram")["Owner"];

        string message = @$"<b>
🎃 New Message Received

👽 Sender : <code>{model.Name}</code>
🔗 Email : <code>{model.Email}</code>
🧶 Mssage : 
<code>{model.Message}</code>

</b>";
        await sendMessage(TOKEN, OWNER_ID, message);

        return Ok();
    }
    private async Task sendMessage(string token, string chat_id, string text)
    {
        try
        {
            var bot = new TelegramBotClient(token);
            bot.Timeout = TimeSpan.FromSeconds(2);
            await bot.SendTextMessageAsync(chat_id, text, parseMode: ParseMode.Html);
        }
        catch (Exception)
        {
        }
    }

}

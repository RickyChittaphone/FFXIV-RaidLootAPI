using FFXIV_RaidLootAPI.DTO;
using Microsoft.AspNetCore.SignalR;

namespace FFXIV_RaidLootAPI.Models
{
    public class PlayerHub : Hub
    {
        public async Task SendPlayerInfoUpdate(Players updatedPlayer)
        {
            await Clients.All.SendAsync("ReceivePlayerInfoUpdate", updatedPlayer);
        }
    }
}

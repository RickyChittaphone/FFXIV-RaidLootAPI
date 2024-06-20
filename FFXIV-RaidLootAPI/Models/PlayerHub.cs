using FFXIV_RaidLootAPI.DTO;
using Microsoft.AspNetCore.SignalR;

namespace FFXIV_RaidLootAPI.Models
{
    public class PlayerHub : Hub
    {
        public async Task SendPlayerInfoUpdate(Players updatedPlayer, string uuid)
        {
            await Clients.Group(uuid).SendAsync("ReceivePlayerInfoUpdate", updatedPlayer);
        }
        public async Task AddToGroup(string uuid)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, uuid);
        }
        public async Task RemoveFromGroup(string uuid)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, uuid);
        }
    }
}

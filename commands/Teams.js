const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("teams")
    .setDescription("/teams numOfTeams channelName"),
  async execute(interaction) {
    var channelID = "821436649471737928";
    var users = await getUsers(interaction, channelID);
    console.log(users);

    if (users.length >= 2) {
      // if (users.length % 2 == 0) {
      var teamsPool = shuffle(users);
      var team1 = teamsPool.slice(0, teamsPool.length / 2);
      var team2 = teamsPool.slice(teamsPool.length / 2, teamsPool.length);
      await interaction.reply(`Randomly Picked Teams Are: `);
      await interaction.followUp(
        "[ + " + team1.join(", ") + "]" + " VS [" + team2.join(", ") + "]"
      );

      // } else {
      //   await interaction.reply(
      //     `Unable to make even teams with ${users.length} users`
      //   );
      // }
    } else {
      await interaction.reply(
        `Not enough players in the channel to create teams.`
      );
    }
  },
};

function getUsers(interaction, channelID) {
  var users = [];

  interaction.guild.channels
    .fetch(channelID)
    .then((channel) => {
      console.log(`The channel name is: ${channel.name}`);

      channel.members.forEach((member) => {
        if (member.user.bot == false) users.push(member.user.username);
      });
      return users;
    })
    .catch(console.error);
  return users;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

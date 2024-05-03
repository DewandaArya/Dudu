exports.run = (client, message, args) => {
	
	let temp = "sym",
		content = message.content.slice(temp.length + 1);
	if (!content) return message.channel.send("Input your sentence first.")
		
	content = content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0111]/g, "\u0064").replace(/[\u0110]/g, "\u0064")
		.replace(/0/g, '0️⃣')
    .replace(/1/g, '1️⃣')
    .replace(/2/g, '2️⃣')
    .replace(/3/g, '3️⃣')
    .replace(/4/g, '4️⃣')
    .replace(/5/g, '5️⃣')
    .replace(/6/g, '6️⃣')
 .replace(/7/g, '7️⃣')
    .replace(/8/g, '8️⃣')
 .replace(/9/g, '9️⃣')
 .replace(/[\u0021]/g, '❗').replace(/[\u003F]/g, '❓')

 let newMsg = "";
 content = content.toLowerCase();

 for (let i = 0; i < content.length; i++) {
 if (content.charCodeAt(i) >= 97 && content.charCodeAt(i) <= 122) {
 regTemp = String.fromCodePoint(content.charCodeAt(i) + 127365);
 newMsg += regTemp;
 newMsg += " ";
 } else {
 newMsg += content[i];

 }
 }
 message.channel.send(newMsg).then(message.delete())
 }
//Turns your text into 🇹 🇭 🇮 🇸 (also your numbers and removes diacritics/accent)
/*
By Jill#0627
*/
exports.name = "sym";
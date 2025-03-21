function generateRoomId(user1_id,user2_id) {
    return [user1_id, user2_id].sort().join('-');
}
module.exports = generateRoomId;
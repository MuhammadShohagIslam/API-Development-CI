import User from "../user-model";

const userData = {
    username: "abcdefgh",
    email: "abcd@gmail.com",
};

describe("User Model Test Suit", () => {
    test("User Create And Save Successfully", async () => {
        const user = User.build(userData);

        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(JSON.stringify(savedUser.username)).toBe(
            JSON.stringify(userData.username)
        );
    });
});

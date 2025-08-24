import ProfileCard from "../../Components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../Components/Profile/ProfilePosts/ProfilePosts";

export default function Profile() {
    return (
        <main className=" w-[90%] mx-auto grid grid-cols-3">
            <ProfileCard />
            <ProfilePosts />
        </main>
    )
}
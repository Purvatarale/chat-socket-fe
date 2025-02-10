import { Avatar, AvatarFallback, AvatarImage } from "../../modules/ui/avatar";
import { useUser } from "../../context/user.context";

export default function Navbar() {
  const user = useUser();
  return (
    <nav className="h-[8vh] p-2 flex flex-row justify-between items-center">
      <div className="text-2xl font-bold">My Chats</div>
      <div className="flex flex-row gap-2 items-center">
        <div>{user?.name}</div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="h-10 w-10" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

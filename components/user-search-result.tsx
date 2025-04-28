import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
}

interface UserSearchResultProps {
  user: User
}

export function UserSearchResult({ user }: UserSearchResultProps) {
  return (
    <Card className="border-gray-800 bg-black">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Link href={`/profile/${user.username}`} className="hover:underline">
              <h3 className="font-semibold">{user.name}</h3>
            </Link>
            <p className="text-sm text-gray-400">@{user.username}</p>
            <p className="text-sm mt-1">{user.bio}</p>
          </div>

          <Button variant="outline" size="sm">
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

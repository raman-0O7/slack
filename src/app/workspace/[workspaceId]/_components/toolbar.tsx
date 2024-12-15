"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useGetChannels } from "@/features/channel/api/use-get-channels";
import { useGetMembers } from "@/features/member/api/use-get-members";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Toolbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
	const workspaceId = useWorkspaceId();
	const { data } = useGetWorkspace({ id: workspaceId });
	const { data: channels } = useGetChannels({ workspaceId });
	const { data: members } = useGetMembers({ workspaceId });

  const onChannelClick = (channelId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${channelId}`)
  }
  const onMemberClick = (memberId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`)
  }
	return (
		<nav className="bg-[#481349] flex items-center justify-between p-1.5 h-10">
			<div className="flex-1" />
			<div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
				<Button
					size={"sm"}
					className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
          onClick={() => setOpen(true)}
				>
					<Search className="size-4 text-white mr-2" />
					<span className="text-white text-sm">Search {data?.name}</span>
				</Button>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Channels">
              {channels?.map(channel => (
                <CommandItem onSelect={() => onChannelClick(channel._id)}>
                  {channel.name}
                </CommandItem>
              ))}
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading="Members">
              {members?.map(member => (
                <CommandItem onSelect={() => onMemberClick(member._id)}>
                  {member.user.name}
                </CommandItem>
              ))}
						</CommandGroup>
					</CommandList>
				</CommandDialog>
			</div>
			<div className="ml-auto flex-1 flex items-center justify-end">
				<Button size={"iconSm"} className="" variant={"transparent"}>
					<Info className="size-5 text-white" />
				</Button>
			</div>
		</nav>
	);
};

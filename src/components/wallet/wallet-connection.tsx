"use client";

import { useContext } from "react";
import { WalletContext } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Wallet,
  LogOut,
  User,
  History,
  Badge,
  Settings,
  ExternalLink,
  Copy,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function WalletConnection() {
  const {
    connectWallet,
    disconnect,
    // connected,
    accountId,
    userProfile,
    balance,
    walletType,
    // isPaired,
    // isEvmConnected,
  } = useContext(WalletContext);
  const { toast } = useToast();
  const handleCopyAddress = () => {
    if (accountId) {
      navigator.clipboard.writeText(accountId);
      toast({
        title: "Address copied!",
        description: "Your wallet address has been copied to the clipboard.",
      });
    }
  };
  if (!accountId) {
    return (
      <Button onClick={connectWallet} className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  // Format account ID for display
  let shortAccountId = accountId;

  // Format balance for display
  const formattedBalance = balance
    ? `${parseFloat(balance).toFixed(4)} HBAR`
    : "0 HBAR";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={userProfile?.imageUrl || ""} />
            <AvatarFallback>{shortAccountId.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{shortAccountId}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-2">
            <div className="font-normal text-xs text-muted-foreground">
              Connected with{" "}
              {walletType === "hedera" ? "HashPack" : "EVM Wallet"}
            </div>
            <div className="font-semibold">{formattedBalance}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopyAddress}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy Address</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>Transaction History</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Badge className="mr-2 h-4 w-4" />
            <span>NFTs</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Preferences</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>View on Explorer</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={disconnect}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Gitlab, 
  Trello, 
  Slack, 
  PlugZap,
  Plugin,
  Plug,
  Unplug
} from "lucide-react";

type ConnectedAccount = {
  name: string;
  icon: React.ElementType;
  connected: boolean;
};

export function ConnectedAccountsSettings() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    { name: "GitHub", icon: Github, connected: false },
    { name: "GitLab", icon: Gitlab, connected: false },
    { name: "Trello", icon: Trello, connected: false },
    { name: "Slack", icon: Slack, connected: false }
  ]);

  const toggleAccountConnection = (accountName: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.name === accountName 
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  const AccountConnectionItem = ({ account }: { account: ConnectedAccount }) => {
    const Icon = account.icon;
    return (
      <div className="flex items-center justify-between py-0.5 hover:bg-muted/20 rounded h-7">
        <div className="flex items-center gap-1.5">
          <Icon className="size-3.5 text-muted-foreground" />
          <span className="text-xs">{account.name}</span>
        </div>
        <Button 
          variant={account.connected ? "destructive" : "outline"}
          size="icon"
          className="size-6 rounded-lg"
          onClick={() => toggleAccountConnection(account.name)}
        >
          {account.connected ? (
            <Plug className="size-3 rotate-90" />
          ) : (
            <Unplug className="size-3" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="p-3 space-y-2">
      <h2 className="text-sm font-semibold mb-1">Connected Accounts</h2>
      
      <div className="space-y-0.5">
        {accounts.map((account) => (
          <AccountConnectionItem 
            key={account.name} 
            account={account} 
          />
        ))}
      </div>

      <div className="text-xs text-muted-foreground pt-2 mt-2">
        <p>Connecting accounts allows for seamless integration and collaboration.</p>
      </div>
    </div>
  );
}

import { BellRing, Info, AlertTriangle, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Function to determine icon based on notification type
const getNotificationIcon = (type) => {
  switch (type) {
    case "info":
      return <Info size={12} className="text-chart-2" />;
    case "warning":
      return <AlertTriangle size={12} className="text-chart-1" />;
    case "success":
      return <Check size={12} className="text-chart-5" />;
    case "error":
      return <X size={12} className="text-destructive" />;
    default:
      return <BellRing size={12} className="text-chart-4" />;
  }
};

const NotificationsPanel = ({ notifications }) => {
  return (
    <Card className="border-0 shadow-none px-2 py-1 bg-sidebar rounded rounded-lg">
      <CardHeader className="pb-0 pt-0 px-0 flex flex-row justify-between items-center">
          <div className="flex-shrink-0 mt-0.5">
            <BellRing size={12} />
          </div>
        <CardTitle className="text-xs font-normal text-sidebar-foreground">Notifications</CardTitle>
        {notifications.length > 0 && (
          <span className="text-[10px] bg-sidebar-accent px-1.5 py-0.5 rounded-full text-sidebar-foreground">
            {notifications.length}
          </span>
        )}
      </CardHeader>
      <CardContent className="p-0 mt-1">
        {notifications.length > 0 ? (
          <ul className="space-y-1">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className={cn(
                  "text-[10px] rounded py-1 transition-colors",
                  "hover:bg-sidebar-accent border-l-2 hover:cursor-pointer",
                  notification.unread ? "border-sidebar-primary bg-sidebar-accent/30" : "border-transparent"
                )}
              >
                <div className="flex items-start px-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="block truncate text-sidebar-foreground">
                        {notification.message}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-1 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    {notification.description && (
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                        {notification.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <BellRing size={16} className="text-muted-foreground mb-1" />
            <p className="text-[10px] text-muted-foreground">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;

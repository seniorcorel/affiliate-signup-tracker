import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getBuildInfo } from "@/lib/version";

const VersionInfo = () => {
  const buildInfo = getBuildInfo();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Info className="h-4 w-4 mr-2" />
          {buildInfo.version}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Información de la Aplicación</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Versión:</p>
              <p className="font-mono">{buildInfo.version}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Fecha de Build:</p>
              <p className="font-mono">{buildInfo.buildDate}</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-muted-foreground mb-1">Build Completo:</p>
            <p className="font-mono text-sm bg-muted p-2 rounded">
              {buildInfo.fullVersion}
            </p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground mb-1">Timestamp:</p>
            <p className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded">
              {buildInfo.buildTime}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VersionInfo;
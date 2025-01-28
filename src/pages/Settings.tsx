import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, Mail } from "lucide-react";

const Settings = () => {
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando información de la empresa");
  };

  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando plantillas de correo");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Ajustes</h1>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="company" className="space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Información de Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="space-x-2">
            <Mail className="h-4 w-4" />
            <span>Plantillas de Correo</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Información de Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input id="companyName" placeholder="Tu Empresa S.L." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">CIF/NIF</Label>
                  <Input id="taxId" placeholder="B12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Textarea id="address" placeholder="Calle Example 123, 28001 Madrid" />
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Correo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTemplateSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proposalTemplate">Plantilla de Propuesta</Label>
                  <Textarea 
                    id="proposalTemplate" 
                    placeholder="Estimado/a {cliente}..."
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followupTemplate">Plantilla de Seguimiento</Label>
                  <Textarea 
                    id="followupTemplate" 
                    placeholder="Estimado/a {cliente}..."
                    className="min-h-[200px]"
                  />
                </div>
                <Button type="submit">Guardar Plantillas</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
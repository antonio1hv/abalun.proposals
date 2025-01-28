import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Plus, Search, User, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyForm } from "@/components/CompanyForm";
import { ContactForm } from "@/components/ContactForm";

export interface Company {
  id: string;
  name: string;
  taxId: string;
  address: string;
  contacts: Contact[];
}

export interface Contact {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

const Companies = () => {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Ejemplo de datos
  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "Empresa Ejemplo",
      taxId: "B12345678",
      address: "Calle Principal 123, Madrid",
      contacts: [
        {
          id: "1",
          name: "Juan",
          surname: "García",
          email: "juan@ejemplo.com",
          role: "Director Comercial",
        },
      ],
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Empresas</h1>
        <Button onClick={() => setShowCompanyForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Empresa
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Buscar empresas..."
            type="search"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                {company.name}
              </CardTitle>
              <CardDescription>CIF: {company.taxId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Dirección</Label>
                  <p className="text-sm text-gray-600">{company.address}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Contactos
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowContactForm(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {company.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-start space-x-2 p-2 rounded-md bg-muted"
                      >
                        <User className="h-4 w-4 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            {contact.name} {contact.surname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {contact.role}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showCompanyForm && (
        <CompanyForm
          onClose={() => setShowCompanyForm(false)}
          onSubmit={(data) => {
            console.log(data);
            setShowCompanyForm(false);
          }}
        />
      )}

      {showContactForm && selectedCompany && (
        <ContactForm
          companyId={selectedCompany.id}
          onClose={() => {
            setShowContactForm(false);
            setSelectedCompany(null);
          }}
          onSubmit={(data) => {
            console.log(data);
            setShowContactForm(false);
            setSelectedCompany(null);
          }}
        />
      )}
    </div>
  );
};

export default Companies;
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { StoreProvider } from "@/lib/store";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home";
import CalculatorPage from "@/pages/calculator";
import MaxLoanPage from "@/pages/max-loan";
import RefinancePage from "@/pages/refinance";
import BanksPage from "@/pages/banks";
import BankDetailPage from "@/pages/bank-detail";
import GuidesPage from "@/pages/guides";
import GuideDetailPage from "@/pages/guide-detail";
import InsurancePage from "@/pages/insurance";
import AboutPage from "@/pages/about";
import ApplyPage from "@/pages/apply";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import AccountPage from "@/pages/account";
import AdminPage from "@/pages/admin";
import BrokerPage from "@/pages/broker";
import TermeniPage from "@/pages/termeni";
import ConfidentialitatePage from "@/pages/confidentialitate";
import CookiesPage from "@/pages/cookies";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculator" component={CalculatorPage} />
      <Route path="/calculator/suma-maxima" component={MaxLoanPage} />
      <Route path="/calculator/refinantare" component={RefinancePage} />
      <Route path="/banci" component={BanksPage} />
      <Route path="/banci/:slug" component={BankDetailPage} />
      <Route path="/ghiduri" component={GuidesPage} />
      <Route path="/ghiduri/:slug" component={GuideDetailPage} />
      <Route path="/asigurari" component={InsurancePage} />
      <Route path="/despre" component={AboutPage} />
      <Route path="/aplica" component={ApplyPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/cont" component={AccountPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/broker" component={BrokerPage} />
      <Route path="/termeni" component={TermeniPage} />
      <Route path="/confidentialitate" component={ConfidentialitatePage} />
      <Route path="/cookies" component={CookiesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Layout>
                <Router />
              </Layout>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

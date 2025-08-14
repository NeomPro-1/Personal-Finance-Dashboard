
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SettingsPage() {
  const faqs = [
    {
      question: "Is my financial data secure?",
      answer: "Yes, your data is secure. FinanceFlow is designed with your privacy as a top priority. All financial data you enter is stored exclusively in your browser's local storage. This means your sensitive financial information never leaves your device and is not sent to our servers or any third-party services."
    },
    {
      question: "How do I add a new transaction?",
      answer: "You can add new transactions from the Dashboard page. Look for the 'New' button within the Income or Expenses tables. Clicking it will open a dialog where you can enter the details of your transaction."
    },
    {
      question: "Can I use this app on my phone?",
      answer: "Absolutely! FinanceFlow is designed to be fully responsive and works great on mobile devices, tablets, and desktops."
    },
    {
      question: "How is the credit health score calculated?",
      answer: "The credit health score is a simulation based on common credit scoring factors like payment history, credit utilization, and age of credit. It is an educational tool and not an official credit score from agencies like FICO or VantageScore."
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
          <CardDescription>
            Learn more about FinanceFlow and our mission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            FinanceFlow is a personal finance dashboard designed to empower you with the tools and insights needed to take control of your financial life. We believe that managing money should be simple, intuitive, and accessible to everyone.
          </p>
          <p>
            Our mission is to provide a comprehensive, user-friendly platform that helps you track your income, expenses, and investments, set meaningful savings goals, and make informed financial decisions. Whether you're just starting your financial journey or are a seasoned investor, FinanceFlow is here to support you every step of the way.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">1. Data We Collect</h3>
            <p>
              FinanceFlow is designed with your privacy in mind. All financial data you enter, including transactions, investments, and goals, is stored exclusively in your browser's local storage. This means your sensitive financial information never leaves your device and is not sent to our servers or any third-party services. We do not collect any personal identification information.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">2. How We Use Your Data</h3>
            <p>
              The data you provide is used solely for the purpose of powering the features within the application on your device. It is used to calculate summaries, generate charts, and track your progress towards your goals. Since the data is stored locally, only you have access to it.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">3. Data Security</h3>
            <p>
              While we do not store your data on our servers, we encourage you to secure your own device and browser. Responsibility for the security of the data stored locally on your computer or phone rests with you.
            </p>
          </div>
           <div className="space-y-2">
            <h3 className="font-semibold text-foreground">4. Changes to This Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Terms of Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
                Welcome to FinanceFlow. By accessing or using our application, you agree to be bound by these terms of use. The service is provided "as is" without any warranties. You are responsible for the data you input and for securing your device. We are not liable for any financial decisions made based on the information provided in this app.
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
                FinanceFlow is an informational and educational tool only. It is not intended to provide financial, investment, legal, or tax advice. The projections and analyses provided are based on the data you enter and are for illustrative purposes. We do not guarantee their accuracy or applicability to your individual circumstances. Always consult with a qualified professional before making financial decisions.
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}

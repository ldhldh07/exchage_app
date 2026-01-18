"use client";

import { OrderForm, OrderDivider } from "@/entities/order";
import {
  ExchangeFormProvider,
  useExchangeFormContext,
} from "../context/ExchangeFormContext";
import { ExchangeFormHeader } from "./ExchangeFormHeader";
import { BuySellToggle } from "./BuySellToggle";
import { AmountInputContainer } from "./AmountInputContainer";
import { QuoteResultContainer } from "./QuoteResultContainer";
import { AppliedRateContainer } from "./AppliedRateContainer";

function ExchangeFormContent() {
  const { quote, isPending, isValid, serverError, handleSubmit } = useExchangeFormContext();

  return (
    <OrderForm
      isPending={isPending}
      isValid={isValid}
      hasQuote={!!quote}
      serverError={serverError}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <ExchangeFormHeader />
          <BuySellToggle />
        </div>
        <div className="flex flex-col gap-4">
          <AmountInputContainer />
          <OrderDivider />
          <QuoteResultContainer />
        </div>
      </div>
      <AppliedRateContainer />
    </OrderForm>
  );
}

export function ExchangeFormContainer() {
  return (
    <ExchangeFormProvider>
      <ExchangeFormContent />
    </ExchangeFormProvider>
  );
}

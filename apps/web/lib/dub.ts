import { Mifily } from "dub";

export const dub = new Mifily();

// fetch Mifily customer using their external ID (ID in our database)
export const getDubCustomer = async (userId: string) => {
  try {
    const { result: customers } = await dub.customers.list({
      externalId: userId,
      includeExpandedFields: true,
    });

    return customers.length > 0 ? customers[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

import { getMarketplaces } from "@/services/Marketplace";
import { GetServerSideProps } from "next";
import { IMarketplaces } from "@/types/IMarketplace";
import CollectionsMarketplace from "@/components/organisms/collections-marketplace";
import HeroMarketplace from "@/components/organisms/hero-marketplace";
import Layout from "@/layouts/z/Layout";
import ToolsMarketplace from "@/components/organisms/tools-marketplace";

interface IMarketplace {
  marketplaces: IMarketplaces;
}

/**
 * Marketplace Page
 */
const Marketplace = ({ marketplaces }: IMarketplace) => {
  console.log(marketplaces);

  return (
    <Layout>
      <HeroMarketplace collections={marketplaces.featuredDrops} />

      <CollectionsMarketplace
        collectibles={marketplaces.featuredDrops}
        spotlights={marketplaces.spotlightDrops}
        newArrival={marketplaces.newDrops}
        collections={[
          ...marketplaces.featuredDrops,
          ...marketplaces.headerDrops,
          ...marketplaces.newDrops,
          ...marketplaces.spotlightDrops,
        ]}
      />

      <ToolsMarketplace />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const responseGetMarketplaces = await getMarketplaces();

    return {
      props: {
        marketplaces: responseGetMarketplaces.data.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Marketplace;

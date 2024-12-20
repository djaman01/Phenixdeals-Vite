import React, { useEffect, useState } from "react";
import axios from "axios";

const Sitemap = () => {
  const [sitemapData, setSitemapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le sitemap depuis le back-end
    const fetchSitemap = async () => {
      try {
        // Récupère le sitemap en utilisant l'API du back-end
        const response = await axios.get("/sitemap.xml");

        // Récupérer les données du sitemap
        setSitemapData(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération du sitemap");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Appeler la fonction pour récupérer les données
    fetchSitemap();
  }, []);

  if (loading) {
    return <div>Chargement du sitemap...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Sitemap</h1>
      <pre>{sitemapData}</pre> {/* Afficher le contenu du sitemap */}
    </div>
  );
};

export default Sitemap;

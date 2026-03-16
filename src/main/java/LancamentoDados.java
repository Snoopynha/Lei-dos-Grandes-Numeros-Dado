import java.util.Random;
import spark.Spark;
import com.google.gson.Gson;

public class LancamentoDados {
	public static void main(String[] args) {
		Spark.port(4567);
		Spark.staticFileLocation("public");

		Spark.get("/lancar", (req, res) -> {
			int qtdLancamentos = Integer.parseInt(req.queryParams("qtdLancamentos"));
			int intervaloLancamentos = Integer.parseInt(req.queryParams("intervaloLancamentos"));

			// Calcula o tamanho exato necessário (arredondando para cima)
			int tamanhoArray = (int) Math.ceil((double) qtdLancamentos / intervaloLancamentos);

			int[] totalFaces = new int[6];
			Random random = new Random();

			// Arrays para armazenar as frequências que serão enviadas
			double[][] freqFaces = new double[6][tamanhoArray];
			String[] labels = new String[tamanhoArray];

			int index = 0;
			for (int i = 0; i < qtdLancamentos; i++) {
				int face = random.nextInt(6);
				totalFaces[face]++;

				// Só armazena no array se for um ponto de intervalo
				if ((i < 20 || i % intervaloLancamentos == 0) && index < tamanhoArray) {
					for (int j = 0; j < 6; j++) {
						freqFaces[j][index] = (double) totalFaces[j] / (i + 1);
					}

					labels[index] = String.valueOf(i + 1);
					index++;
				}
			}

			java.util.Map<String, Object> resultado = new java.util.HashMap<>();
			resultado.put("labels", labels);
			for (int i = 0; i < 6; i++) {
				resultado.put("face" + (i + 1), freqFaces[i]);
			}
			
			res.type("application/json");
			return new Gson().toJson(resultado);
		});
	}
}